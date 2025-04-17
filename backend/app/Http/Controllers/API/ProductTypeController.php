<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProductTypeController extends Controller
{
    public function index()
    {
        return ProductType::where('user_id', Auth::id())->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('product-images', 'public');
        }

        $productType = ProductType::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'description' => $request->description,
            'image' => $imagePath,
        ]);

        return response()->json($productType, 201);
    }

    public function show(ProductType $productType)
    {
        $this->authorizeOwner($productType);
        return $productType;
    }

    public function update(Request $request, ProductType $productType)
    {
        $this->authorizeOwner($productType);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($productType->image) {
                Storage::disk('public')->delete($productType->image);
            }
            $productType->image = $request->file('image')->store('product-images', 'public');
        }

        $productType->update($request->only('name', 'description', 'image'));

        return response()->json($productType);
    }

    public function destroy($id)
    {
        $product = ProductType::find($id);
    
        // If the product type is not found, return a 404 error response
        if (!$product) {
            return response()->json(['error' => 'Product type not found'], 404);
        }
    
        // Ensure the current user is authorized to delete the product type
        $this->authorizeOwner($product);
    
        // Delete the image if it exists
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
    
        // Delete the product type from the database
        $product->delete();
    
        return response()->json(['message' => 'Product type deleted']);
    }
    
    

    protected function authorizeOwner(ProductType $productType)
    {
        if ($productType->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }
    }
}
