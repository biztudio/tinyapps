/*jshint esversion: 6 */
import mathkit from './mathkit'

export default {
    source:'abcdefghijklmnopqrstuvwxyz',
    
    get_letter_list:function(to_uppercase=false){
        let letter_list = []
        for(let letter of this.source)
            letter_list.push(to_uppercase?letter.toUpperCase():letter);
        return letter_list;
    },

    get_letter_list_random:function(to_uppercase=false){
        let source_list = this.get_letter_list(to_uppercase);
        let max_index = source_list.length - 1;
        let random_list = [];        
        for(let new_index = 0; new_index <= max_index; new_index++ ){
            let index = mathkit.get_random_number_index(source_list.length);
            random_list[new_index] = source_list[index];
            source_list.splice(index, 1);
        }
        return random_list;
    }
}