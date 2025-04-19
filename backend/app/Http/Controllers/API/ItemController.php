<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\ProductType;
use Illuminate\Support\Facades\Auth;

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
        $productType = ProductType::findOrFail($productTypeId);
        $this->authorizeOwner($productType);

        $request->validate([
            'serial_numbers' => 'required|array|min:1',
            'serial_numbers.*' => 'required|string|distinct',
        ]);

        $items = [];
        foreach ($request->serial_numbers as $serial) {
            $items[] = new Item([
                'serial_number' => $serial,
                'is_sold' => false,
            ]);
        }

        $productType->items()->saveMany($items);

        return response()->json(['message' => 'Items added successfully'], 201);
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

    public function markSold($id)
    {
        $item = Item::findOrFail($id);
        $productType = $item->productType;
        $this->authorizeOwner($productType);

        $item->update([
            'is_sold' => true,
        ]);

        return response()->json(['message' => 'Item marked as sold']);
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
