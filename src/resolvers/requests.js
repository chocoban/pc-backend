import dotenv from 'dotenv';
import models from '../../db/models';

dotenv.config();

class Request {
  static async createOrUpdateRequest(id, formData) {
    const reason = formData;
    let request;
    try {
      request = await models.Request.findOne({
        where: { id }
      });
      if (request) {
        console.log('before_update', request);
        newrequest = await Request.updateRequest(request, reason);
        console.log('after_update', request);
      }
      if (!request) {
        // console.log('_create', request);
        request = await models.Request.create({ reason });
      }
      const newRequest = {
        id: request.dataValues.id,
        reason: request.dataValues.reason
      };
      return newRequest;
    } catch (err) { return err; }
  }

  static async getAllRequests() {
    const requests = await models.Request.findAll({});
    return requests;
  }

  static async getSingleRequest(id) {
    const request = await models.Request.findOne({
      where: { id }
    });
    return request;
  }

  static async updateRequest(request, updateFormData) {
    const { id, reason } = request.datavalues;
    console.log('fffff###---->');
    const updatedRequest = await models.Request.update({
      reason: reason || updateFormData
    }, {
      where: { id }, returning: true
    });
    return updatedRequest;
  }

  static async deleteRequest(id) {
    try {
      const request = await models.Request.findOne({
        where: { id }
      });
      if (!request) {
        return ' Request does not exist';
      }
      await models.Request.destroy({ where: { id } });
      return 'Delete complete';
    } catch (err) { return err; }
  }
}

export default Request;
