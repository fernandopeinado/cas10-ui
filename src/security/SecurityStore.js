import { observable, computed, action } from 'mobx'

/**
 * Guarda informações relativas ao usuário logado para usar as componentes do módulo security.
 * 
 * Lembrar de limpar ao fechar a tela ou deslogar, caso contrário a informação pode ficar inconsistente em relação a sessão.
 */
class SecurityStore {
    @observable login
    @observable name
    @observable roles = []
    
    @computed get loaded() {
        return this.login != null
    }

    /**
     * define o usuario no store
     * @param um objeto de usuário com as propriedades: login:string, name:string e roles:Array<string>
     */
    @action setUser({login, name, roles}) {
        this.login = login
        this.name = name
        if (roles != null) {
            this.roles = [...roles]
        }
        else {
            this.roles = []
        }
    }

    @action clearUser() {
        this.login = null;
        this.name = null;
        this.roles = [];
    }

    hasRole = (roleToVerify) => {
        if (!roleToVerify) return true
        return this.roles.indexOf(roleToVerify) >= 0
    }

    hasRoles = (rolesToVerify) => {
        if (!rolesToVerify) return true
        const roles = this.roles
        return rolesToVerify.reduce((val, curr) => {
            return val && roles.indexOf(curr) >= 0
        }, true) 
    }

    hasAnyRole = (rolesToVerify) => {
        if (!rolesToVerify || rolesToVerify.length == 0) return true
        const roles = this.roles
        return rolesToVerify.reduce((val, curr) => val || roles.indexOf(curr) >= 0, false) 
    }

}

const securityStore = new SecurityStore()

export default securityStore