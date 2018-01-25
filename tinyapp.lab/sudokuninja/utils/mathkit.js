/*jshint esversion: 6 */
export default{
    get_random_number_index: function(range=9){
        if(range == 0) range = 2;
        let rs = Math.random() * 10
        let rn = Math.ceil(rs)
        let index = rn % range
        return index
    }
}