<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        return Inertia::render('Products/Index', compact("products"));
    }

    public function create(){
        return Inertia::render('Products/Create');
    }
    
    public function store(Request $request){
        $request->validate([
            'name'=>'required|string|max:255',
            'price'=>'nullable|numeric',
            'description'=> 'nullable|string'
        ]);
        Product::create($request->all());
        return redirect()->route('products.index')->with('message','Product created succesfully!');
    }

    public function edit (Product $product){
        return inertia::render('Products/Edit', compact('product'));
    }

    public function update(Request $request, Product $product){
         $request->validate([
            'name'=>'required|string|max:255',
            'price'=>'nullable|numeric',
            'description'=> 'nullable|string'
        ]);

        $product->update([
            'name'=> $request->input('name'),
            'price'=> $request->input('price'),
            'description'=> $request->input('description'),
        ]);

        return redirect()->route('products.index')->with('message', "Product updated succesfully");
    }

    public function destroy (Product $product){
        $product->delete();
        return redirect()->route('products.index')->with('message', 'Product Delete Succesfully');
    }

}
