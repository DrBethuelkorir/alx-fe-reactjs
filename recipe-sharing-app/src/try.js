import { use } from 'react';
import {create} from 'zustand';

const useUSer = create(
    (set) =>(
        {
            count:0,
            increament: ()=>set((state) =>(
                {
                    count: state.count+1
                }
            ))
        }
    )
)
export default useUSer