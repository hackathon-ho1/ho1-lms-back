import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Put,
  Body,
  Query,
} from '@nestjs/common';

@Controller()
export class LectureController {
  @Get('course')
  async getCourses() {
    try {
      return;
    } catch (error) {
      console.log(error);
    }
  }
}
