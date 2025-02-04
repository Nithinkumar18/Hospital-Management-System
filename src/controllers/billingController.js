const billingService = require('../services/billingService');
const cns = require('../constants/statusConstants');
const cnsinfo = require('../constants/statusInfo');


async function uploadBill(req, res) {
    try {
        const billData = req.body;
        const billInfo = await billingService.generateBill(billData);
        if (billInfo === cnsinfo.APPOINMENT_DUE) {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.FAIL_STATUS, Acknowledgement: cnsinfo.BILL_NOTGENERATED })
        }
        else {
            return res.status(cns.CREATED).json({ status: cnsinfo.SUCESS_STATUS, Acknowledgement: cnsinfo.BILL_GENERATED, billInfo });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, errMessage: err.message });
    }
}

async function Bills(req, res) {
    try {
        const bills_data = await billingService.viewBills();
        if (bills_data.length > 0) {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, bills_data });
        }
        else {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, Message: cnsinfo.BILLS });
        }

    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrorMessage: err.message });
    }
}

async function updateBillInfo(req, res) {
    try {
        const billId = req.params.bill_id;
        const billData = req.body;
        const updated_Bill = await billingService.updateBill(billId,billData);
        if (updated_Bill) {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, Acknowledgement: cnsinfo.BILL_UPDATED, lastUpdate: updated_Bill.updatedAt });
        }
        else {
            return res.status(cns.NOT_FOUND).json({ status: cnsinfo.FAIL_STATUS, Acknowledgement: cnsinfo.BILL_NOT_FOUND });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrorMessage: err.message });
    }
}

async function deleteBills(req, res) {
    try {
        const bId = req.params.billId;
        const deletedBill = await billingService.deleteBill(bId);
        if (deletedBill) {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, Acknowledgement: cnsinfo.BILL_DELETED, lastUpdate: deletedBill.updatedAt });
        }
        else {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, Acknowledgement: cnsinfo.BILL_NOT_FOUND });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrorMessage: err.message });
    }
}


async function viewPatientBills(req, res) {
    try {
        const p_id = req.params.patientId;
        const myBills = await billingService.patientBills(p_id);
        if (myBills.length > 0) {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, myBills });
        }
        else if (myBills.length == 0) {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, Acknowledgement: cnsinfo.BILLS_PATIENT });
        }
        else {
            return res.status(cns.NOT_FOUND).json({ status: cnsinfo.FAIL_STATUS, Acknowledgement: cnsinfo.PATIENT_NOT_FOUND });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrorMessage: err.message });
    }
}


async function customGeneratedBillsRevenue(req, res) {
    try {
        const start_date = req.params.start_date;
        const end_date = req.params.end_date;
        const allbills = await billingService.generatedRevenueOverTimeRange(start_date, end_date);
        if (allbills) {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, Acknowledgement: cnsinfo.REVENUE_OVERTIME + " " + allbills });
        }
        else {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.FAIL_STATUS, Acknowledgement: cnsinfo.BILL_NOT_FOUND });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrorMessage: err.message });
    }
}


async function generatedRevenue(req, res) {
    try {
        const revenue = await billingService.totalRevenue();

        return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, Revenue: revenue });

    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrorMessage: err.message });
    }
}


module.exports = {
    uploadBill,
    Bills,
    updateBillInfo,
    deleteBills,
    viewPatientBills,
    customGeneratedBillsRevenue,
    generatedRevenue
}