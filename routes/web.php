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

Route::get('/usersList', 'UserController@getAllUsers');
Route::get('/getDuels', 'UserController@getDuels');
Route::post('/getPartidas', 'UserController@getPartidas');
Route::post('/getBoard', 'UserController@getBoard');
Route::get('/getMatch/{id}', 'UserController@getMatch');
Route::post('/updateMatchCards1', 'UserController@updateMatchCards1');
Route::post('/updateMatchCards2', 'UserController@updateMatchCards2');
Route::post('/deleteBoard', 'UserController@deleteBoard');
Route::post('/addPoints', 'UserController@addPoints');
Route::post('/removePoints', 'UserController@removePoints');
Route::post('/comprarPack', 'UserController@comprarPack');
Route::post('/userNewPoints', 'UserController@userNewPoints');
Route::post('/createDuel', 'UserController@createDuel');
Route::post('/setBoard', 'UserController@setBoard');
Route::post('/createGame', 'UserController@createGame');
Route::post('/deleteDuel', 'UserController@deleteDuel');
Route::post('/updatePuntuacion', 'UserController@updatePuntuacion');
Route::post('/updateCartasJugada', 'UserController@updateCartasJugada');
Route::post('/deleteMatch', 'UserController@deleteMatch');
Route::post('/updateTurno', 'UserController@updateTurno');

Route::resource('/cards', 'CardController');
Route::post('/cardsUser', 'CardController@cardsUser');
Route::post('/fiveRandomCards', 'CardController@fiveRandomCards');
Route::post('/getSingleCard', 'CardController@getSingleCard');
Route::post('/getGrid', 'CardController@getGrid');
Route::post('/updateGrid', 'CardController@updateGrid');
Route::post('/updateCartas', 'CardController@updateCartas');
Route::post('/getMatchCards', 'CardController@getMatchCards');

