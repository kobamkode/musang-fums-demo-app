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

export const createUser = async (
        locals: App.Locals,
        data: {
                name: string;
                email: string;
                password: string;
                role_id: number;
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
                        role_id: data.role_id
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
                role_id: number;
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
                        role_id: data.role_id
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

export const findRole = async (locals: App.Locals, ...query: string[]) => {
        let queryString = ''

        if (query.length > 0) {
                const params = new URLSearchParams();

                for (const param of query) {
                        if (param.includes('name=')) {
                                const name = param.split('=')[1];
                                params.append('name', name);
                        } else if (param.includes('id=')) {
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
