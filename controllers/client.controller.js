import ClientModel from "../models/client.js";

export const getClients = async (req, res) => {
	try {
		const clients = await ClientModel.find();
		res.status(200).json(clients);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getClient = async (req, res) => {
	try {
		const { id } = req.params;
		const client = await ClientModel.findById(id);
		if (!client) {
			return res.status(404).json({ message: "Client not found" });
		}
		res.status(200).json(client);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createClient = async (req, res) => {
	try {
		const client = await ClientModel.create(req.body);
		res.status(201).json(client);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateClient = async (req, res) => {
	try {
		const { id } = req.params;
		const client = await ClientModel.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!client) {
			return res.status(404).json({ message: "Client not found" });
		}
		res.status(200).json(client);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteClient = async (req, res) => {
	try {
		const { id } = req.params;
		const client = await ClientModel.findByIdAndDelete(id);
		if (!client) {
			return res.status(404).json({ message: "Client not found" });
		}
		res.status(200).json({ message: "Client deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
