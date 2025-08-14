export const getAllUsers = async (locals: App.Locals) => {
        const response = await fetch('http://localhost:8080/api/v1/users', {
                method: 'GET',
                headers: {
                        'Authorization': `Bearer ${locals.user?.token}`,
                }
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }

        const { Data } = await response.json()
        return Data ? Data : []
}

export const getAllRoles = async (locals: App.Locals) => {
        const response = await fetch('http://localhost:8080/api/v1/roles', {
                method: 'GET',
                headers: {
                        'Authorization': `Bearer ${locals.user?.token}`,
                }
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }

        const { Data } = await response.json()
        return Data ? Data : []
}

export const getAllCompanies = async (locals: App.Locals) => {
        const response = await fetch('http://localhost:8080/api/v1/companies', {
                method: 'GET',
                headers: {
                        'Authorization': `Bearer ${locals.user?.token}`,
                }
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }

        const { Data } = await response.json()
        return Data ? Data : []
}

export const getAllCountries = async (locals: App.Locals) => {
        const response = await fetch('http://localhost:8080/api/v1/countries', {
                method: 'GET',
                headers: {
                        'Authorization': `Bearer ${locals.user?.token}`,
                }
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }

        const { Data } = await response.json()
        return Data ? Data : []
}

export const getAllPermissions = async (locals: App.Locals) => {
        const response = await fetch('http://localhost:8080/api/v1/permissions', {
                method: 'GET',
                headers: {
                        'Authorization': `Bearer ${locals.user?.token}`,
                }
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }

        const { Data } = await response.json()
        return Data ? Data : []
}

export const createUser = async (
        locals: App.Locals,
        data: {
                name: string;
                email: string;
                password: string;
                role_id: string;
        },

) => {
        const response = await fetch('http://localhost:8080/api/v1/users', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
                body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        role_id: Number(data.role_id)
                })
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

export const createRole = async (
        locals: App.Locals,
        data: {
                name: string;
        },

) => {
        const response = await fetch('http://localhost:8080/api/v1/roles', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
                body: JSON.stringify(data)
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

export const createCompany = async (
        locals: App.Locals,
        data: {
                name: string;
                code: string
                country_id: string
        },

) => {
        const response = await fetch('http://localhost:8080/api/v1/companies', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
                body: JSON.stringify(data)
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

export const createPermission = async (
        locals: App.Locals,
        data: {
                user_id: string;
                company_id: string
                role_id: string
        },

) => {
        const response = await fetch('http://localhost:8080/api/v1/permissions', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
                body: JSON.stringify({
                        user_id: Number(data.user_id),
                        company_id: Number(data.company_id),
                        role_id: Number(data.role_id),
                })
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

export const updateUser = async (
        locals: App.Locals,
        data: {
                name: string;
                email: string;
                role_id: string;
        },
        user_id: number
) => {

        const response = await fetch(`http://localhost:8080/api/v1/users/${user_id}`, {
                method: 'PUT',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
                body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        role_id: Number(data.role_id)
                })
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

export const updateRole = async (
        locals: App.Locals,
        data: {
                name: string;
        },
        role_id: number
) => {

        const response = await fetch(`http://localhost:8080/api/v1/roles/${role_id}`, {
                method: 'PUT',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
                body: JSON.stringify(data)
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

export const updateCompany = async (
        locals: App.Locals,
        data: {
                name: string;
                code: string
                country_id: string
        },
        company_id: number
) => {

        const response = await fetch(`http://localhost:8080/api/v1/companies/${company_id}`, {
                method: 'PUT',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
                body: JSON.stringify(data)
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

export const updatePermission = async (
        locals: App.Locals,
        data: {
                user_id: string;
                company_id: string
                role_id: string
        },
        permission_id: number
) => {

        const response = await fetch(`http://localhost:8080/api/v1/permissions/${permission_id}`, {
                method: 'PUT',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
                body: JSON.stringify({
                        user_id: Number(data.user_id),
                        company_id: Number(data.company_id),
                        role_id: Number(data.role_id),
                })
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

export const deleteUser = async (
        locals: App.Locals,
        user_id: number
) => {

        const response = await fetch(`http://localhost:8080/api/v1/users/${user_id}`, {
                method: 'DELETE',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

export const deleteRole = async (
        locals: App.Locals,
        role_id: number
) => {

        const response = await fetch(`http://localhost:8080/api/v1/roles/${role_id}`, {
                method: 'DELETE',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

export const deleteCompany = async (
        locals: App.Locals,
        company_id: number
) => {

        const response = await fetch(`http://localhost:8080/api/v1/companies/${company_id}`, {
                method: 'DELETE',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

export const deletePermission = async (
        locals: App.Locals,
        permission_id: number
) => {

        const response = await fetch(`http://localhost:8080/api/v1/permission/${permission_id}`, {
                method: 'DELETE',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

export const findRole = async (locals: App.Locals, ...query: string[]) => {
        let queryString = ''

        if (query.length > 0) {
                const params = new URLSearchParams();

                for (const param of query) {
                        if (param.includes('id=')) {
                                const id = param.split('=')[1];
                                params.append('id', id);
                        }
                }

                queryString = params.toString() ? `?${params.toString()}` : '';
        }

        const response = await fetch(`http://localhost:8080/api/v1/roles${queryString}`, {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }

        const { Data } = await response.json()
        return Data ? Data : []
}

export const findUser = async (locals: App.Locals, ...query: string[]) => {
        let queryString = ''

        if (query.length > 0) {
                const params = new URLSearchParams();

                for (const param of query) {
                        if (param.includes('email=')) {
                                const email = param.split('=')[1];
                                params.append('email', email);
                        } else if (param.includes('id=')) {
                                const id = param.split('=')[1];
                                params.append('id', id);
                        }
                }

                queryString = params.toString() ? `?${params.toString()}` : '';
        }
        const response = await fetch(`http://localhost:8080/api/v1/users${queryString}`, {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
        });
        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }

        const { Data } = await response.json()
        return Data ? Data : []
}


export const findCompany = async (locals: App.Locals, ...query: string[]) => {
        let queryString = ''

        if (query.length > 0) {
                const params = new URLSearchParams();

                for (const param of query) {
                        if (param.includes('id=')) {
                                const id = param.split('=')[1];
                                params.append('id', id);
                        }
                }

                queryString = params.toString() ? `?${params.toString()}` : '';
        }

        const response = await fetch(`http://localhost:8080/api/v1/companies${queryString}`, {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }

        const { Data } = await response.json()
        return Data ? Data : []
}


export const findCountry = async (locals: App.Locals, ...query: string[]) => {
        let queryString = ''

        if (query.length > 0) {
                const params = new URLSearchParams();

                for (const param of query) {
                        if (param.includes('alpha2=')) {
                                const alpha2 = param.split('=')[1];
                                params.append('alpha2', alpha2);
                        }
                }

                queryString = params.toString() ? `?${params.toString()}` : '';
        }

        const response = await fetch(`http://localhost:8080/api/v1/countries${queryString}`, {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }

        const { Data } = await response.json()
        return Data ? Data : []
}

export const findPermission = async (locals: App.Locals, ...query: string[]) => {
        let queryString = ''

        if (query.length > 0) {
                const params = new URLSearchParams();

                for (const param of query) {
                        if (param.includes('is=')) {
                                const id = param.split('=')[1];
                                params.append('id', id);
                        }
                }

                queryString = params.toString() ? `?${params.toString()}` : '';
        }

        const response = await fetch(`http://localhost:8080/api/v1/permissions${queryString}`, {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }

        const { Data } = await response.json()
        return Data ? Data : []
}
