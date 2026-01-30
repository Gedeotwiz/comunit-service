/** @format */

import Service from '../model/serviceModel.js';
import Category from '../model/category.js';
import User from '../model/userModel.js';
import { sendEmail } from '../services/sendEmail.js';

class ServiceController {
  static createService = async (req, res) => {
    try {
      const { title, description, categorys, price } = req.body;
      const category = await Category.findById(categorys);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const service = await Service.findOne({ title });
      if (service) {
        return res.status(403).json({ messgae: 'Service already exist' });
      }

      let newService = await Service.create({
        title,
        description,
        categorys,
        price,
        provider: userId,
      });

      newService = await newService.populate([
        { path: 'categorys', select: 'categoryName' },
        { path: 'provider', select: 'names email' },
      ]);

      const users = await User.find();
      if (!users) {
        return res
          .status(404)
          .json({ status: 404, message: 'users not found' });
      }
      users.map(async (user) => {
        await sendEmail({
          receiverEmail: user.email,
          title: req.body.title,
          serviceDescription: req.body.description,
        });
      });

      return res.status(201).json({
        message: 'Service successfully created',
        newService,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static findServices = async (req, res) => {
    try {
      const service = await Service.find();
      if (!service) {
        return res.status(404).json({ message: 'service not found' });
      } else {
        return res
          .status(200)
          .json({ message: 'service successfuly retrived', service });
      }
    } catch (error) {
      return res.status(500).json({ message: `Error is ${error}` });
    }
  };
}
export default ServiceController;
