<?php

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// READ ALL
Route::get('contacts', function () {
  return Contact::latest()->orderBy('created_at', 'desc')->get();
});

// READ BY ID
Route::get('contact/{id}', function ($id) {
    return Contact::findOrFail($id);
});

// CREATE
Route::post('contact/store', function (Request $request) {
  return Contact::create([
      'name' => $request->input('name'),
      'email' => $request->input('email'),
      'phone' => $request->input('phone')
  ]);
});

// UPDATE
Route::patch('contact/{id}', function (Request $request, $id) {
  Contact::findOrFail($id)->update([
    'name' => $request->input('name'),
    'email' => $request->input('email'),
    'phone' => $request->input('phone')
  ]);
});

// DELETE
Route::delete('contact/{id}', function ($id) {
    return Contact::destroy($id);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
