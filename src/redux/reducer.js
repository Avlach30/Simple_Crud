const initialstate = {    
    //state default
    employees: [    
        { id: 1, employeeName: "Karyawan 1", employeeDepartment: "Developer Web" },    
        { id: 2, employeeName: "Karyawan 2", employeeDepartment: "Developer Aplikasi" },    
        { id: 3, employeeName: "Karyawan 3", employeeDepartment: "Desainer" }    
    ]    
};    
    
const reducer = (state = initialstate, action) => {    
    switch (action.type) {    
        case 'GET_EMPLOYEE':  
        //spread operator (...) untuk mengakses semua isi dari array
            return {    
                ...state    
            };    
        case 'ADD_EMPLOYEE':    
            return {    
                ...state,    
                //method concat untuk menggabungkan array yang baru dibuat dengan array yang telah ada sebelumnya
                employees: state.employees.concat(action.payload)    
            };    
        case 'EDIT_EMPLOYEE':    
            return {    
                ...state,    
                //method map mengembalikan sebuah array yang baru
                employees: state.employees.map(    
                    (content, i) => content.id === action.payload.id ? {...content, employeeName : action.payload.employeeName ,  employeeDepartment : action.payload.employeeDepartment }    
                                            : content)    
            };    
        case 'DELETE_EMPLOYEE':    
            return {    
                //method filter untuk memfilter array, dikarenakan adanya tanda false (!==) maka array tersebut akan hilang/dihapus
                ...state,    
                employees: state.employees.filter(item => item.id !== action.payload)    
            };    
        default:    
            return state;    
    }    
};    
    
export default reducer; 