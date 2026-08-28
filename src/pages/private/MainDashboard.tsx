import { useEffect, useState } from "react"
import { get } from "../../services/get"
import type { User } from "../../types/user"
import type { Category, CreateCategory,EditCategory,} from "../../types/categories"
// import type { CreateCategory } from "../../types/categories"
import { post } from "../../services/post"
import { patch } from "../../services/patch"
import { remove } from "../../services/delete"

function MainDashboard() {
    const [category, setCategory] = useState<Category[]>([])
    const [selectedEditId, setSelectedEditId] = useState<string|null>(null)
    const [loading, setLoading] = useState(Boolean)
    const [creating, setCreating] = useState(false)
    const [editing, setEditing] = useState(false)
    const storedUser = localStorage.getItem("user")
    const user: User | null = storedUser ? JSON.parse(storedUser) : null
    const [showModal, setShowModal] = useState(false)
    const [showPathcModal, setShowPatchModal] = useState(false)
    const [removing, setRemoving] = useState(false)
    
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    })

    const [formEidtData, setFormEditData] = useState({
        name: "",
        description: "",
    })


    useEffect(() => {
        const fetchCategories = async () => {
            try {

                const categories = await get<Category[]>("categories")
                setCategory(categories)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }
        fetchCategories()
    }, [])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            setCreating(true)
            const newCategory = await post<Category, CreateCategory>("categories", formData)
            setCategory(prev => [...prev, newCategory])

            alert("categorie created")
            setShowModal(false)
            setFormData({
                name: "",
                description: "",
            });
        } catch (error) {
            console.log(error)
            alert("error")
        } finally {
            setCreating(false)
        }
    }

    function handleEdit (item:Category){
        setSelectedEditId(item.id)
        setFormEditData(
            {
                name:item.name ?? "",
                description:item.description ?? ""
            }
        )
        setShowPatchModal(true)
        
    }

    async function handlePatch(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if(!selectedEditId)return
        
        try{
            setEditing(true)
            const updateCategorie = await patch<Category,EditCategory>("categories", formEidtData, selectedEditId)
            setCategory((prev)=>
                prev.map(item=>
                    item.id === selectedEditId? updateCategorie:item
                )
            )
            setShowPatchModal(false)
            setSelectedEditId(null)   
            alert("category edited")
        } catch (error){
            console.log(error)
            alert("error")
        } finally{
            setEditing(false)
        }
    }

    async function handleDelete(id:string){
        try{
            setRemoving(true)
            const removeCategorie = await remove("categories",id)
            setCategory((prev) =>
            prev.filter(item=>
                item.id === id? removeCategorie:item
            )
        )
        } catch (error){
            console.log(error);
            alert("error")
            
        } finally{
            setRemoving(false)
        }
    }




    return (
        <>

            <div className="flex justify-end p-6 pb-0">
                {user?.role === "admin" && (

                    <button onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                        Create Category
                    </button>
                )}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">

                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Create Category
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Category name"
                                    required

                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            name: e.target.value
                                        })
                                    }}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>

                                <textarea
                                    placeholder="Category description"
                                    value={formData.description}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            description: e.target.value
                                        })
                                    }}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                                />
                                {creating && (
                                    <p className="text-sm text-blue-600 mt-2">
                                        Creating category...
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    disabled={creating}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {creating ? "Creating..." : "Create"}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}


            {showPathcModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">

                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Edit Category
                            </h2>

                            <button
                                onClick={() => setShowPatchModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handlePatch}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Category name"
                                    required
                                    value={formEidtData.name}
                                    onChange={(e) => {
                                        setFormEditData({
                                            ...formEidtData,
                                            name: e.target.value
                                        })
                                    }}
                                   
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>

                                <textarea
                                    placeholder="Category description"
                                    value={formEidtData.description}
                                    onChange={(e) => {
                                        setFormEditData({
                                            ...formEidtData,
                                            description: e.target.value
                                        })
                                    }}
                                   
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                                />
                                {editing && (
                                    <p className="text-sm text-blue-600 mt-2">
                                        Editing category...
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() =>{ setShowPatchModal(false) }}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={editing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {editing ? "Editing..." : "Edit"}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}



            {loading ? (<p> loading</p>) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-6">
                    {category.map((item) => (
                        <article
                            key={item.id}
                            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {item.name}
                            </h2>

                            <p className="text-gray-500 text-sm leading-relaxed mb-5">
                                {item.description}
                            </p>

                            <div className="flex gap-3">
                                {user?.role==="admin" && (
                                    <>
                                    
                                <button
                                    onClick={()=> handleEdit(item)}
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
                                >
                                    Editar
                                </button>

                                <button
                                    disabled={removing}
                                    onClick={() =>handleDelete(item.id)}
                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition"
                                >
                                    Eliminar
                                </button>
                                    </>
                                )}

                            </div>
                        </article>
                    ))}
                </div>


            )}



        </>
    )
}

export default MainDashboard