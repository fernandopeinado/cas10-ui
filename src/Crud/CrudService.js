import axios from 'axios';

/**
 * Serviço básico para parear com um controller e um repository básico de CRUD genérico,
 * onde a chave primária é definida por uma propriedade padrão "id"
 */
export default class CrudService {

    /**
     * @param baseUrl parametro obrigatório com a url base do serviço
     * @param idProperty o nome da propriedade correspondente ao identificador (default: id).
     */
    constructor({ baseUrl, idProperty = "id" } = {}) {
        this.baseUrl = baseUrl;
        this.idProperty = idProperty;
    }

    getId(dto) {
        return dto[this.idProperty];
    }

    setId(dto, id) {
        dto[this.idProperty] = id;
    }

    findAll = () => {
        return axios.get(this.baseUrl)
            .then(response => response.data);
    }

    page = (pageSize, page) => {
        return axios.get(this.baseUrl + "/page/" + pageSize + "/" + page)
            .then(response => response.data);
    }

    findAllBy = (queryName, dto) => {
        return axios.post(this.baseUrl + '/findAll/' + queryName, dto)
            .then(response => response.data);
    }

    findOneBy = (queryName, dto) => {
        return axios.post(this.baseUrl + '/findOne/' + queryName, dto)
            .then(response => response.data);
    }

    getById = (id) => {
        return axios.get(this.baseUrl + '/' + encodeURI(id))
            .then(response => response.data);
    }

    create = (dto) => {
        return axios.post(this.baseUrl, dto)
            .then(response => response.data);
    }

    update = (dto) => {
        return axios.put(this.baseUrl + '/' + encodeURI(dto[this.idProperty]), dto)
            .then(response => response.data);
    }

    delete = (id) => {
        return axios.delete(this.baseUrl + '/' + encodeURI(id))
            .then(response => response.data);
    }

    _get = (url) => {
        return axios.get(this.baseUrl + url)
            .then(response => response.data);
    }

    _post = (url, data) => {
        return axios.post(this.baseUrl + url, data)
            .then(response => response.data);
    }

}