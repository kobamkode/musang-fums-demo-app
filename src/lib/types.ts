export interface Permission {
	id: number;
	user_id: number;
	company_id: number;
	role_id: number;
	is_deleted: boolean;
}

export interface User {
	id: number
	name: string
	email: string
}

export interface ProcessedPermission {
	id: number;
	user_id: number;
	company_code: string;
	company_name: string;
	company_active: boolean;
	role_id: number;
}

export interface Local {
	id: number
	name: string
	email: string
	token: string
	perms: ProcessedPermission[] | null
}

export interface Atg {
	id: number;
	transaction_id: string;
	tank_number: number;
	volume: number;
	tc_volume: number;
	ullage: number;
	height: number;
	water_height: number;
	temp: number;
	water_volume: number;
	date_update: Date;
	location: string;
	code_company: string;
	fuel_station: string;
	data_source: string;
	created_at: Date;
	full_volume: number;
	datalogger_id: string;
	tank_label: string;
	status: boolean;
}


export interface Country {
	id: number
	alpha2: string
	alpha3: string
	name: string
}

export interface Company {
	id: number
	name: string
	code: string
	country_id: string
}


export interface ATGStatus {
	id: number
	status: string
	label: string
}

export interface FlowmeterStatus {
	id: number
	status: string
	label: string
}

export interface Role {
	id: number
	name: string
}
