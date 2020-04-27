export class Card{
    constructor(
        public id: number,
        public nombre: string,
        public img_aliado: string,
        public img_rival: string,
        public valor_arriba: number,
        public valor_abajo: number,
        public valor_izquierda: number,
        public valor_derecha: number,
        public rareza: string,
    ){}
}