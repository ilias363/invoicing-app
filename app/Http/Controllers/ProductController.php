<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $sortBy = $request->get('sortBy', 'name');
        $sortDirection = $request->get('sortDirection', 'asc');

        $products = Product::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            })
            ->orderBy($sortBy, $sortDirection)
            ->paginate(6);

        return Inertia::render('Products', [
            'productsData' => response()->json($products),
            'searchTerm' => $search,
            'sortBy' => $sortBy,
            'sortDirection' => $sortDirection,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = [
            'Meubles de salon',
            'Meubles de chambre',
            'Cuisine et salle à manger',
            'Décoration',
            'Salle de bain',
            'Rangements',
            'Bureau et multimédia',
            'Extérieur',
            'Enfants',
            'Électroménager et accessoires',
        ];
    
        return Inertia::render('CreateProduct', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'category' => 'nullable|string|max:255',
        ], [
            'name.required' => 'Product name is required.',
            'price.required' => 'Price is required.',
            'price.numeric' => 'Price must be a valid number.',
            'discount.numeric' => 'Discount must be a valid number.',
            'stock_quantity.required' => 'Stock quantity is required.',
            'stock_quantity.integer' => 'Stock quantity must be an integer.',
        ]);

        DB::beginTransaction();

        try {
            $product = Product::create([
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'price' => $validatedData['price'],
                'stock_quantity' => $validatedData['stock_quantity'],
                'category' => $validatedData['category'],
                'discount' => $validatedData['discount'],
            ]);

            DB::commit();
            $user = Auth::user();

            return redirect()->route($user->role->name.'.products')->with('success', 'Product successfully created.');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->with('error','Failed to create the product. Please try again later.');
        }
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit($id)
    {
        $categories = [
            'Meubles de salon',
            'Meubles de chambre',
            'Cuisine et salle à manger',
            'Décoration',
            'Salle de bain',
            'Rangements',
            'Bureau et multimédia',
            'Extérieur',
            'Enfants',
            'Électroménager et accessoires',
        ];
        $productToEdit = Product::find($id);

        return inertia('UpdateProduct', [
            'productToEdit' => $productToEdit,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'category' => 'nullable|string|max:255',
        ], [
            'name.required' => 'Product name is required.',
            'price.required' => 'Price is required.',
            'price.numeric' => 'Price must be a valid number.',
            'stock_quantity.required' => 'Stock quantity is required.',
            'stock_quantity.integer' => 'Stock quantity must be an integer.',
        ]);

        DB::beginTransaction();

        try {
            $product->name = $validatedData['name'];
            $product->description = $validatedData['description'];
            $product->price = $validatedData['price'];
            $product->stock_quantity = $validatedData['stock_quantity'];
            $product->category = $validatedData['category'];

            $product->save();

            DB::commit();

            $user = Auth::user();

            return redirect()->route($user->role->name.'.products')->with('success', 'Product successfully updated.');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->withErrors(['error' => 'Failed to update the product. Please try again later.']);
        }
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if ($product) {
            $product->delete();
            return redirect()->back()->with('success', 'Product deleted successfully.');
        }

        return redirect()->back()->withErrors(['error' => 'Product not found.']);
    }
}
