<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(){
        return Inertia::render('Products/Index', []);
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

    
}
