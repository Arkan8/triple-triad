<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    protected $table = 'boards';

    public function packs(){
        return $this->belongsTo(Match::class);
    }
}
