import dotenv from 'dotenv';
import models from '../../db/models';

dotenv.config();

class Request {
  static async duplicateRequest(amount, reason, payment, authorId) {
    const existingRequest = await models.Request.findAll({ where: { authorId } });
    existingRequest.forEach(values => {
      const existingRequestValues = {
        existingAmount: values.dataValues.amount,
        existingReason: values.dataValues.reason,
        existingPayment: values.dataValues.payment,
      };
      const {
        existingAmount, existingReason, existingPayment
      } = existingRequestValues;
      if ((existingAmount === amount)
            && (existingReason === reason)
            && (existingPayment === payment)) {
        throw Error('Request already exists');
      }
    });
  }

  static async createRequest(amount, reason, payment, authorId) {
    try {
      const request = await models.Request.create({ reason, amount, payment, authorId });
      return {
        id: request.dataValues.id,
        amount: request.dataValues.amount,
        reason: request.dataValues.reason,
        payment: request.dataValues.payment,
      };
    } catch (err) { return err; }
  }

  static async getAllRequests() {
    const requests = await models.Request.findAll({});
    return requests;
  }

  static async getSingleRequest(id) {
    const request = await models.Request.findOne({ where: { id } });
    return request;
  }

  static async updateRequest(
    id, updatedAmount, updatedReason, updatedPayment, updatingAuthorId
  ) {
    try {
      const request = Request.getSingleRequest(id);
      if (!request) {
        return new Error('Request does not exist');
      }
      const {
        reason, amount, payment, authorId
      } = request.dataValues;
      if (updatingAuthorId === authorId) {
        const updatedRequest = await models.Request.update({
          amount: amount || updatedAmount,
          reason: reason || updatedReason,
          payment: payment || updatedPayment
        }, { where: { id }, returning: true });
        return updatedRequest;
      }
      return new Error('Unauthorized to edit request');
    } catch (err) { return err; }
  }

  static async deleteRequest(id) {
    try {
      const request = Request.getSingleRequest(id);
      if (!request) {
        return new Error('Request does not exist');
      }
      await models.Request.destroy({ where: { id } });
      return 'Delete complete';
    } catch (err) { return err; }
  }
}

export default Request;
