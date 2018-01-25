/*jshint esversion: 6 */
import mathkit from './mathkit'

export default{   
    checkSudoku:function(sudoku){
        let grid_init_indes = this.getStartIndesInGrids()
        let first_indes_per_line = this.getIndexListInColum(0)
        let checksum = 0
        for(let grid_init_index of grid_init_indes){
            let indes_in_grid = this.getIndexListInGrid(grid_init_index)
            checksum = 0
            for(let index_in_grid of indes_in_grid){
                checksum += (sudoku[index_in_grid] * 1)
            }
            if(checksum != 45) return {validation:false, check:1, refindex:grid_init_index, checksum:checksum}
        }
        console.log('Sudoku is valid in grids.')
        
        for(let first_index_in_line of first_indes_per_line){
            checksum = 0
            for(let index = first_index_in_line; index < first_index_in_line + 9; index++){
                checksum += (sudoku[index] * 1)
            }
            if(checksum != 45) return {validation:false, check:2, refindex:first_index_in_line, checksum:checksum}
        }
        console.log('Sudoku is valid in lines.')
        
        for(let index = 0; index < 9; index++){
            let col_indes = this.getIndexListInColum(index)
            checksum = 0
            for(let col_index of col_indes){
                checksum += (sudoku[col_index] * 1)
            }
            if(checksum != 45) return {validation:false, check:3, refindex:index, checksum:checksum}
        }
        console.log('Sudoku is valid in columns.')

        return {validation:true, check:0, refindex:0, checksum:checksum}
    },

    generateSeedArray:function(grid_seed){
        let grid = []
        let temp_pool = grid_seed.slice(0)
        for(let index in grid_seed){
            let index = mathkit.get_random_number_index(temp_pool.length);
            let number = temp_pool[index];
            grid.push(number)
            temp_pool.splice(index, 1)
        }        
        return grid
    },

    getLineIndex:function(index){
        return Math.floor(index / 9);
    },

    getColumnIndex:function(index){
        return index % 9
    },

    getStartIndexInLine:function(index){
        let line_index = this.getLineIndex(index)
        return line_index * 9
    },

    getIndexListInColum:function(index){
        let column_start_index = this.getColumnIndex(index)
        let indes = []
        for(let i = 0; i < 9; i++){
            indes.push(column_start_index + i * 9)
        }
        return indes
    },

    getInitializedSudoku9:function(){
        let sudoku = []       
        for(let index = 0; index < 81; index++){ sudoku.push(0) }
        return sudoku
    },

    getStartIndesInGrids:function(sudoku){
        if(!sudoku){
           sudoku = this.getInitializedSudoku9()
        }
        let grid_init_indes = []
        for(let sudokuindex in sudoku){
            let line_index = Math.floor(sudokuindex / 9)
            let cell_index_in_line = sudokuindex % 9
            let grid_column_index = Math.floor(cell_index_in_line/3);
            let grid_line_index = Math.floor(line_index/3);
            let init_grid_index = 9 * (grid_line_index  * 3) + (grid_column_index) * 3;
            if(!grid_init_indes.includes(init_grid_index))
                grid_init_indes.push(init_grid_index)
        }
        return grid_init_indes
    },

    getIndexListInGrid:function(index, grid_init_indes){
        if(!grid_init_indes){
            grid_init_indes = this.getStartIndesInGrids()
        }
        let line_index = this.getLineIndex(index)
        let colum_index = this.getColumnIndex(index)       
        let grid_indes = []
        for(let grid_init_index of grid_init_indes){
            let grid_start_col_index = this.getColumnIndex(grid_init_index)
            let grid_start_line_index = this.getLineIndex(grid_init_index)
            let column_offset = colum_index - grid_start_col_index
            let line_offset = line_index - grid_start_line_index
            if(column_offset >= 0 && column_offset <=2 && 
                line_offset >= 0 && line_offset <=2){
                    for(let gi = 0; gi < 3; gi++){
                        grid_indes.push((grid_init_index + gi)*1)
                        grid_indes.push((grid_init_index + gi + 9)*1)
                        grid_indes.push((grid_init_index + gi + 18)*1)
                    }
                    break;
                }
        }
        let sorted_result = grid_indes.sort(function (m, n) {
                                             if (m < n) return -1
                                             else if (m > n) return 1
                                             else return 0
        })
        return sorted_result
    },

    validateNumberPositionInColumn:function(index, number, sudoku){
        let cindes = this.getIndexListInColum(index)
        let map = true;
        for(let cindex of cindes){
            if(sudoku[cindex] == number){
                map = false;
                break;
            }
        }
        return map
    },

    getSudokuSourceData:function(){
        let x_grid_count = 3
        let y_grid_count = 3
        let x_cell_count_per_grid = 3
        let y_cell_count_per_grid = 3
        let grid_seed = [1,2,3,4,5,6,7,8,9]
        let sudoku = []
        let max_count_per_line = x_grid_count * x_cell_count_per_grid
        let max_count_per_column = y_grid_count * y_cell_count_per_grid
        let max_lenght = max_count_per_column * max_count_per_line
        for(let index = 0; index < max_lenght; index++){ sudoku.push(0) }
        
        let grid_init_indes = []
        for(let sudokuindex in sudoku){
            let line_index = Math.floor(sudokuindex / 9)
            let cell_index_in_line = sudokuindex % 9
            let grid_column_index = Math.floor(cell_index_in_line/3);
            let grid_line_index = Math.floor(line_index/3);
            let init_grid_index = 9 * (grid_line_index  * 3) + (grid_column_index) * 3;
            if(!grid_init_indes.includes(init_grid_index))
                grid_init_indes.push(init_grid_index)
        }

        let source_seed = this.generateSeedArray(grid_seed)
        let grid_template = source_seed.slice(0)

        let current_line = 0
        for(let sudokuindex in sudoku){
            let line_index = this.getLineIndex(sudokuindex)
            if(line_index % 3 < 1){
                if(sudoku[sudokuindex] == 0){
                    if(current_line != line_index){
                        if(line_index == 3 || line_index == 6){
                            let temp_num = grid_template.shift()
                            grid_template.push(temp_num)
                        }
                        current_line = line_index                      
                    }
                    let colindex = this.getColumnIndex(sudokuindex)
                    sudoku[sudokuindex] = grid_template[colindex]
                }
            }
        }

        current_line = 0
        for(let sudokuindex in sudoku){
            let line_index = this.getLineIndex(sudokuindex)
            if(line_index % 3 == 1){
                if(sudoku[sudokuindex] == 0){
                    if(current_line != line_index){
                        if(line_index == 1 || line_index == 4 || line_index == 7){
                            let temp_num = grid_template.shift()
                            grid_template.push(temp_num)
                            temp_num = grid_template.shift()
                            grid_template.push(temp_num)
                        } 
                        current_line = line_index                      
                    }
                    let colindex = this.getColumnIndex(sudokuindex)
                    sudoku[sudokuindex] = grid_template[colindex]
                }
            }
        }

        grid_template = source_seed.slice(0)
        for(let gindex of grid_init_indes){
            let line_index = this.getLineIndex(gindex)
            if(line_index > 3) break;//Last grid line needs to calculate by existed digits
            
            let grid_indes = this.getIndexListInGrid(gindex)
            let existed_digits = []
            let empty_indes = []
            for(let sudokuindex of grid_indes){
                if(sudoku[sudokuindex] > 0){
                    existed_digits.push(sudoku[sudokuindex])
                }
                else{
                    empty_indes.push(sudokuindex)
                }
            }            
            let available_digits = grid_template.filter(e => !existed_digits.includes(e))
            let value_map = []
            //console.log(available_digits)
            for(let number of available_digits){
                for(let celli = 0; celli < empty_indes.length; celli++){
                    let sudokuindex      = empty_indes[celli]
                    let sudokuindex_ref1 = 0
                    let sudokuindex_ref2 = 0
                    if(celli == 0){
                        sudokuindex_ref1 = empty_indes[celli * 1 + 1]
                        sudokuindex_ref2 = empty_indes[celli * 1 + 2]
                    }
                    else if(celli == 1){
                        sudokuindex_ref1 = empty_indes[celli * 1 - 1]
                        sudokuindex_ref2 = empty_indes[celli * 1+ 1]
                    }
                    else{
                        sudokuindex_ref1 = empty_indes[celli * 1 - 2]
                        sudokuindex_ref2 = empty_indes[celli * 1 - 1]
                    }

                    let flag      = this.validateNumberPositionInColumn(sudokuindex, number, sudoku)?1:0
                    let flag_ref1 = this.validateNumberPositionInColumn(sudokuindex_ref1, number, sudoku)?1:0
                    let flag_ref2 = this.validateNumberPositionInColumn(sudokuindex_ref2, number, sudoku)?1:0
                    value_map.push({
                        number:number,
                        flag:flag,
                        flag_ref1:flag_ref1,
                        flag_ref2:flag_ref2,
                        sudokuindex: sudokuindex
                    })
                }
            }
            //console.table(value_map)
            let fill_grid_indes = []
            for(let vm of value_map){
                if(vm.flag == 1 && vm.flag+vm.flag_ref1+vm.flag_ref2 < 2){
                    sudoku[vm.sudokuindex] = vm.number
                    fill_grid_indes.push(vm.sudokuindex)
                }
            }
            let left_vm = value_map.filter(vm => vm.flag == 1 && vm.flag+vm.flag_ref1+vm.flag_ref2 >= 1 && !fill_grid_indes.includes(vm.sudokuindex))
            if(left_vm){
                sudoku[left_vm[0].sudokuindex] = left_vm[0].number
            }
        }

        //last line
        for(let cindex = 72; cindex < 81; cindex++){
            let col_indes = this.getIndexListInColum(cindex)
            let temp_sum = 0
            for(let cli of col_indes){
                temp_sum += (sudoku[cli] * 1)
            }
            sudoku[cindex] = 45 - temp_sum
        }

        return sudoku;
    },

    getPuzzleLevel:function(level){
        return (level)?(level < 2?2:(level > 6? 6:level)):3
    },

    getHidePositionInGrid:function(level){
        level = this.getPuzzleLevel(level)
        let hide_postions = []
        let seed = [0,1,2,3,4,5,6,7,8]
        for(let ri = 0; ri < level; ri++){
            let lucky_pos = mathkit.get_random_number_index(seed.length);
            hide_postions.push(seed[lucky_pos])
            seed.splice(lucky_pos, 1);
        }
        return hide_postions
    },

    getSudokuPuzzle:function(level = 3){        
        let sudoku = this.getSudokuSourceData()
        let sudokuPuzzle = []
        for(let sudokuitem of sudoku){
            sudokuPuzzle.push({
                value:sudokuitem,
                display:sudokuitem
            })
        }
        let grid_init_indes = this.getStartIndesInGrids(sudoku)
        for(let grid_init_index of grid_init_indes){
            let grid_indes = this.getIndexListInGrid(grid_init_index)
            let hide_postions = this.getHidePositionInGrid(level)
            for(let lucky_pos of hide_postions){
                let hide_index = grid_indes[lucky_pos]
                sudokuPuzzle[hide_index].display = 0
            }
        }

        return {SudokuPuzzle:sudokuPuzzle, Level:level}
    }
}