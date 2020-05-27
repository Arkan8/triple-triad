<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@login');

Route::resource('/cards', 'CardController');
Route::post('/cardsUser', 'CardController@cardsUser');
Route::get('/usersList', 'UserController@getAllUsers');
Route::get('/getDuels', 'UserController@getDuels');
Route::post('/getPartidas', 'UserController@getPartidas');
Route::get('/getMatch/{id}', 'UserController@getMatch');
Route::post('/fiveRandomCards', 'CardController@fiveRandomCards');
Route::post('/getMatchCards', 'CardController@getMatchCards');
Route::post('/createDuel', 'UserController@createDuel');
Route::post('/createGame', 'UserController@createGame');
Route::post('/deleteDuel', 'UserController@deleteDuel');
