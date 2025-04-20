<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\ProductType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;


class ItemController extends Controller
{
    public function index($productTypeId)
    {
        $productType = ProductType::findOrFail($productTypeId);
        $this->authorizeOwner($productType);

        return $productType->items()->get();

    }


    public function store(Request $request, $productTypeId)
    {
        Log::info("Received productTypeId: " . $productTypeId);
        $productType = ProductType::findOrFail($productTypeId);
        $this->authorizeOwner($productType);
    
        $request->validate([
            'serial_numbers'   => 'required|array|min:1',
            'serial_numbers.*' => 'required|string|distinct',
        ]);
    
        $items = DB::transaction(function() use ($request, $productType) {
            $instances = [];
            foreach ($request->serial_numbers as $serial) {
                $instances[] = new Item([
                    'serial_number' => $serial,
                    'is_sold'       => false,
                ]);
            }
            $productType->items()->saveMany($instances);
            return $instances;
        });
    
        // Return the newly created items if you want
        return response()->json([
          'message' => 'Items added successfully',
          'items'   => $items,
        ], 201);
    }
    

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);
        $productType = $item->productType;
        $this->authorizeOwner($productType);

        $request->validate([
            'serial_number' => 'required|string',
        ]);

        $item->update([
            'serial_number' => $request->serial_number,
        ]);

        return response()->json(['message' => 'Item updated successfully']);
    }

    public function markSold(Request $request, $id)
    {
        $item = Item::findOrFail($id);
        $productType = $item->productType;
        $this->authorizeOwner($productType);
    
        $item->update([
            'is_sold' => $request->boolean('is_sold'),
        ]);
    
        return response()->json(['message' => 'Item sold status updated']);
    }
    

    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $productType = $item->productType;
        $this->authorizeOwner($productType);

        $item->delete();

        return response()->json(['message' => 'Item deleted']);
    }

    protected function authorizeOwner($productType)
    {
        if ($productType->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }
    }
}
