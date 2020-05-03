<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\User;
use App\Card;

class CardController extends Controller
{
    public function index(Request $request){

        header('Access-Control-Allow-Origin: *');
        
        $cards = Card::all();
        
        return response()->json(array(
            'cards' => $cards,
            'status' => 'success'
        ), 200);
        
        /* $hash = $request->header('Authorization', null);
        
        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);
        
        if ($checkToken) {
            echo "Autenticado";
            die();
            
        }else{
            echo "No autenticado";
            die();
        } */
    }
    
    public function cardsUser(Request $request){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Authorization, X-Requested-With');
        
        
        //$cards = Card::with('users')->whereId($id);
        $id = (int)$request['id'];

        $user = User::find($id);
        
        foreach ($user->cards as $card) {
            $cards[] = $card;
        }

        return response()->json(array(
            'cardsUser' => $cards,
            'status' => 'success'
        ), 200);
    }
}
