import axios from 'axios';

/**
 * Serviço básico para parear com um controller e um repository básico de CRUD genérico,
 * onde a chave primária é definida por uma propriedade padrão "id"
 */
export default class CrudService {

    constructor(baseUrl, CrudDTO) {
        this.baseUrl = baseUrl;
        this.CrudDTO = CrudDTO;
    }

    convertPage = (data) => {
        if (this.CrudDTO == null || data == null || !Array.isArray(data['content'])) return data;
        for (let i = 0; i < data.content.length; i++) {
            data.content[i] = this.convertDto(data.content[i]);
        }
        return data;
    }

    convertDto = (data) => {
        if (this.CrudDTO == null || data == null) return data;
        var dto = this.newDto();
        Object.assign(dto, data);
        return dto;
    }

    newDto = () => {
        if (this.CrudDTO) {
            return new this.CrudDTO();
        }
        return {};
    }

    findAll = () => {
        return axios.get(this.baseUrl)
            .then(response => this.convertPage(response.data));
    }

    page = (pageSize, page, searchDto) => {
		if (searchDto) {
            return this.search(pageSize, page, searchDto);
        }
        return axios.get(this.baseUrl + "?size=" + pageSize + "&page=" + page)
            .then(response => this.convertPage(response.data));
    }

    search = (pageSize, page, searchDto) => {
        return axios.post(this.baseUrl + '/search?size=' + pageSize + '&page=' + page, searchDto)
            .then(response => this.convertPage(response.data));
    }

    findBy = (pageSize, page, queryName, params) => {
        return axios.post(this.baseUrl + '/search/' + queryName + '?size=' + pageSize + '&page=' + page, params)
            .then(response => this.convertPage(response.data));
    }

    getById = (id) => {
        return axios.get(this.baseUrl + '/' + encodeURI(id))
            .then(response => this.convertDto(response.data));
    }

    options = (path) => {
        return axios.get(this.baseUrl + '/options/' + encodeURI(path))
            .then(response => response.data);
    }

    create = (dto) => {
        return axios.post(this.baseUrl, dto)
            .then(response => response.data);
    }

    update = (dto) => {
        return axios.put(this.baseUrl + '/' + encodeURI(dto.id), dto)
            .then(response => response.data);
    }

    delete = (id) => {
        return axios.delete(this.baseUrl + '/' + encodeURI(id))
            .then(response => response.data);
    }

    activate = (id) => {
        return axios.put(this.baseUrl + '/' + encodeURI(id) + '/activate')
            .then(response => response.data);
    }

    inactivate = (id) => {
        return axios.put(this.baseUrl + '/' + encodeURI(id) + '/inactivate')
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