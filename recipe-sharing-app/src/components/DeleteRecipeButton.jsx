import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore.js'

const DeleteRecipeButton = () => {
    const deleteRecipe = useRecipeStore((state) => state.deleteRecipe)
    const navigate = useNavigate();
    const [id, setId] = useState("")
    
    const handleEvent = (event) => {
        event.preventDefault()

        if (!id.trim()) {
            alert("Enter ID")
            return
        }
        
        // Convert to number and call deleteRecipe
        deleteRecipe(Number(id.trim()))
        setId("") // Clear the input after deletion
        navigate('/') // Navigate back to home after deletion
    }

    return (
        <div>
            <form onSubmit={handleEvent}>
                <label htmlFor="deletion">Enter Recipe ID to Delete:</label>
                <input
                    id="deletion"
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter recipe ID"
                />
                <button type="submit">Delete Recipe</button>
            </form>
        </div>
    )
}

export default DeleteRecipeButton