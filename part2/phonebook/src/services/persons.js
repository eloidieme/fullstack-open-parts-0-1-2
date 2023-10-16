import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addOne = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deleteOne = (personToDelete) => {
    const request = axios.delete(`${baseUrl}/${personToDelete.id}`)
    return request.then()
}

const updateNumber = (updatedPerson, id) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

export default { getAll, addOne, deleteOne, updateNumber }