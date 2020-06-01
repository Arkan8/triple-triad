<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\User;
use App\Card;
use App\Board;

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

    public function fiveRandomCards(Request $request){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Authorization, X-Requested-With');
        
        
        $id = (int)$request['id'];

        $user = User::find($id);
        
        foreach ($user->cards as $card) {
            $cards[] = $card;
        }

        shuffle($cards);

        for ($i= 0; $i < 5; $i++) { 
            $cartasAleatorias[] = $cards[$i];
        }

        return response()->json(array(
            'fiveCards' => $cartasAleatorias,
            'status' => 'success'
        ), 200);
    }

    public function getMatchCards(Request $request){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Authorization, X-Requested-With');
        
        
        $id = (int)$request['id'];

        $user = User::find($id);
        
        foreach ($user->cards as $card) {
            $cards[] = $card;
        }

        shuffle($cards);

        for ($i= 0; $i < 5; $i++) { 
            $cartasAleatorias[] = $cards[$i];
        }

        return response()->json(array(
            'fiveCards' => $cartasAleatorias,
            'status' => 'success'
        ), 200);
    }

    public function getSingleCard(Request $request){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Authorization, X-Requested-With');
        
        $id = (int)$request['id'];

        $cartaSeleccionada = Card::find($id);
        
        return response()->json(array(
            'cartaSeleccionada' => $cartaSeleccionada,
            'status' => 'success'
        ), 200);
    }

    public function getGrid(Request $request){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Authorization, X-Requested-With');
        
        $id = (int)$request['id'];

        $grid = Card::find($id);
        
        return response()->json(array(
            'grid' => $grid,
            'status' => 'success'
        ), 200);
    }

    public function updateGrid(Request $request){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Authorization, X-Requested-With');

        $board_id = (int)$request['board_id'];
        $grid = $request['grid'];
        $card_id = (int)$request['card_id'];

        var_dump($board_id);
        var_dump($grid);
        var_dump($card_id);

        $board_update = Board::find($board_id);

        $board_update->{$grid} = $card_id;

        $board_update->save();

        return response()->json(array(
            'status' => 'success',
            'message' => 'Grid actualizado'
        ), 200);
        
    }
}
