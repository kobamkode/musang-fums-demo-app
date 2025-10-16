import { API_BASE_URL } from "$env/static/private";
import { currentMonthDateRange } from "./utils";

export const getAllUsers = async (locals: App.Locals) => {
	const response = await fetch(`${API_BASE_URL}/v1/users`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getAllRoles = async (locals: App.Locals) => {
	const response = await fetch(`${API_BASE_URL}/v1/roles`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getAllCompanies = async (locals: App.Locals) => {
	const response = await fetch(`${API_BASE_URL}/v1/companies`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getAllCountries = async (locals: App.Locals) => {
	const response = await fetch(`${API_BASE_URL}/v1/countries`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getAllPermissions = async (locals: App.Locals) => {
	const response = await fetch(`${API_BASE_URL}/v1/permissions`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getAtgData = async (
	locals: App.Locals,
	fuelStation: string,
	tankLabel: string,
	dataloggerId: string,
	startDate?: string,
	endDate?: string

) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
		fs: fuelStation,
		t: tankLabel,
		dl: dataloggerId,
	})

	if (startDate) {
		params.append('s', startDate)
	}

	if (endDate) {
		params.append('e', endDate)
	}

	const response = await fetch(`${API_BASE_URL}/v1/devices/atg?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getGroupedAtgData = async (
	locals: App.Locals,
) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
	})

	const response = await fetch(`${API_BASE_URL}/v1/devices/atg/dashboard?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const findAtgByCC = async (locals: App.Locals) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const response = await fetch(`${API_BASE_URL}/v1/devices/atgstatus?cc=${activeTeam?.company_code}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const findFixedFlowmeterByCC = async (locals: App.Locals) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const response = await fetch(`${API_BASE_URL}/v1/devices/flowmeter/fixed?cc=${activeTeam?.company_code}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const findMobileFlowmeterByCC = async (locals: App.Locals) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const response = await fetch(`${API_BASE_URL}/v1/devices/flowmeter/mobile?cc=${activeTeam?.company_code}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const findAllFlowmeterByCC = async (locals: App.Locals) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const response = await fetch(`${API_BASE_URL}/v1/devices/flowmeter/all?cc=${activeTeam?.company_code}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getFlowmeterData = async (
	locals: App.Locals,
	panelId: string,
	location: string,
	startDate?: string,
	endDate?: string
) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))

	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
		p: panelId,
		loc: location

	})

	if (startDate) {
		params.append('s', startDate)
	}

	if (endDate) {
		params.append('e', endDate)
	}

	const response = await fetch(`${API_BASE_URL}/v1/devices/flowmeter?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const createUser = async (
	locals: App.Locals,
	data: {
		name: string;
		email: string;
		password: string;
	},

) => {
	const response = await fetch(`${API_BASE_URL}/v1/users`, {
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

export const createRole = async (
	locals: App.Locals,
	data: {
		name: string;
	},

) => {
	const response = await fetch(`${API_BASE_URL}/v1/roles`, {
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
	const response = await fetch(`${API_BASE_URL}/v1/companies`, {
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
	const response = await fetch(`${API_BASE_URL}/v1/permissions`, {
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
	},
	user_id: number
) => {

	const response = await fetch(`${API_BASE_URL}/v1/users/${user_id}`, {
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

export const updateRole = async (
	locals: App.Locals,
	data: {
		name: string;
	},
	role_id: number
) => {

	const response = await fetch(`${API_BASE_URL}/v1/roles/${role_id}`, {
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

	const response = await fetch(`${API_BASE_URL}/v1/companies/${company_id}`, {
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

	const response = await fetch(`${API_BASE_URL}/v1/permissions/${permission_id}`, {
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

	const response = await fetch(`${API_BASE_URL}/v1/users/${user_id}`, {
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

	const response = await fetch(`${API_BASE_URL}/v1/roles/${role_id}`, {
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

	const response = await fetch(`${API_BASE_URL}/v1/companies/${company_id}`, {
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

	const response = await fetch(`${API_BASE_URL}/v1/permission/${permission_id}`, {
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

	const response = await fetch(`${API_BASE_URL}/v1/roles${queryString}`, {
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

	const { data } = await response.json()
	return data ? data : []
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
	const response = await fetch(`${API_BASE_URL}/v1/users${queryString}`, {
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

	const { data } = await response.json()
	return data ? data : []
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

	const response = await fetch(`${API_BASE_URL}/v1/companies${queryString}`, {
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

	const { data } = await response.json()
	return data ? data : []
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

	const response = await fetch(`${API_BASE_URL}/v1/countries${queryString}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const findPermission = async (locals: App.Locals, ...query: string[]) => {
	let queryString = ''

	if (query.length > 0) {
		const params = new URLSearchParams();

		for (const param of query) {
			if (param.includes('id=')) {
				const id = param.split('=')[1];
				params.append('id', id);
			}
			if (param.includes('user=')) {
				const user = param.split('=')[1];
				params.append('user', user);
			}
		}

		queryString = params.toString() ? `?${params.toString()}` : '';
	}

	const response = await fetch(`${API_BASE_URL}/v1/permissions${queryString}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const downloadMaximo = async (locals: App.Locals, location?: string, panel?: string, startDate?: string, endDate?: string) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
	})
	if (location) {
		params.append('loc', location)
	}
	if (panel) {
		params.append('p', panel)
	}
	if (startDate) {
		params.append('s', startDate)
	}
	if (endDate) {
		params.append('e', endDate)
	}

	const response = await fetch(`${API_BASE_URL}/v1/loader/maximo?${params.toString()}`, {
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

	const contentDisposition = response.headers.get('content-disposition');
	const filename = contentDisposition
		? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
		: 'maximo_report.xlsx';

	return {
		response, filename
	}

}

export const downloadFixedStation = async (locals: App.Locals, location?: string, panel?: string, startDate?: string, endDate?: string) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
	})
	if (location) {
		params.append('loc', location)
	}
	if (panel) {
		params.append('p', panel)
	}
	if (startDate) {
		params.append('s', startDate)
	}
	if (endDate) {
		params.append('e', endDate)
	}

	const response = await fetch(`${API_BASE_URL}/v1/loader/station?${params.toString()}`, {
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

	const contentDisposition = response.headers.get('content-disposition');
	const filename = contentDisposition
		? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
		: 'fixed_station.xlsx';

	return {
		response, filename
	}

}


export const getFixedIOLastShiftTrans = async (
	locals: App.Locals,
) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
	})

	const response = await fetch(`${API_BASE_URL}/v1/devices/fixed/lastshift-io?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getFixedIOCurrentShiftTrans = async (
	locals: App.Locals,
) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
	})

	const response = await fetch(`${API_BASE_URL}/v1/devices/fixed/currentshift-io?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getPercentageVariance = async (
	locals: App.Locals,
) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
	})

	const response = await fetch(`${API_BASE_URL}/v1/devices/fixed/percentage-variance?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}


export const getMobileIOLastShiftTrans = async (
	locals: App.Locals,
) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
	})

	const response = await fetch(`${API_BASE_URL}/v1/devices/mobile/lastshift-io?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getGroupedFixedData = async (
	locals: App.Locals,
) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
	})

	const response = await fetch(`${API_BASE_URL}/v1/devices/fixed/dashboard?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getFuelUsagesByType = async (
	locals: App.Locals,
	assetType: string,
	startDate?: string,
	endDate?: string
) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
		atype: assetType
	})

	if (startDate) {
		params.append('s', startDate)
	}

	if (endDate) {
		params.append('e', endDate)
	}

	const response = await fetch(`${API_BASE_URL}/v1/fuelusage?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getHeavyEquipmentsFuelUsageTransaction = async (
	locals: App.Locals,
) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const { start, end } = currentMonthDateRange()
	const assetsType = [
		'compact', 'crane truck', 'dozer', 'drilling', 'dump truck', 'excavator'
	]
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
		atype: assetsType.join(",").toUpperCase(),
		acat: "Heavy Equipments",
		s: start,
		e: end
	})

	const response = await fetch(`${API_BASE_URL}/v1/fuelusage/assets?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getUnitSupportsFuelUsageTransaction = async (
	locals: App.Locals,
) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const { start, end } = currentMonthDateRange()
	const assetsType = [
		'fire truck',
		'mesin las',
		'mesin compressor',
		'pompa',
		'sarana manhaul',
		'tower lamp',
		'genset trust',
		'genset bek',
		'genset'
	]
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
		atype: assetsType.join(",").toUpperCase(),
		acat: "Unit Supports",
		s: start,
		e: end
	})

	const response = await fetch(`${API_BASE_URL}/v1/fuelusage/assets?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getContractorsFuelUsageTransaction = async (
	locals: App.Locals,
) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const { start, end } = currentMonthDateRange()
	const assetsType = [
		'tangki kontraktor', 'fuel truck kontraktor'
	]
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
		atype: assetsType.join(",").toUpperCase(),
		acat: "Contractors",
		s: start,
		e: end
	})

	const response = await fetch(`${API_BASE_URL}/v1/fuelusage/assets?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getLightVehicleFuelUsageTransaction = async (
	locals: App.Locals,
) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const { start, end } = currentMonthDateRange()
	const assetsType = [
		'lv bek', 'lv trust', 'lv kontraktor'
	]
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
		atype: assetsType.join(",").toUpperCase(),
		acat: "Light Vehicle",
		s: start,
		e: end
	})

	const response = await fetch(`${API_BASE_URL}/v1/fuelusage/assets?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}

export const getSiteDumpTruckFuelUsageTransaction = async (
	locals: App.Locals,
) => {
	const activeTeam = locals.user?.perms?.find((c) => (c.company_active === true))
	const { start, end } = currentMonthDateRange()
	const assetsType = 'truck sdt'
	const params = new URLSearchParams({
		cc: activeTeam?.company_code || 'TRUST',
		atype: assetsType.toUpperCase(),
		acat: "Site Dump Truck",
		s: start,
		e: end
	})

	const response = await fetch(`${API_BASE_URL}/v1/fuelusage/assets?${params.toString()}`, {
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

	const { data } = await response.json()
	return data ? data : []
}
