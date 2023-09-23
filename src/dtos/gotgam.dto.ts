import {
  IsNumber,
  IsEmpty,
  IsString,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AchievedLectureDto {
  @IsNumber()
  @IsEmpty()
  id: number;

  @IsNumber()
  @IsEmpty()
  lectureId: number;

  @IsString()
  @IsEmpty()
  courseTitle: string;

  @IsString()
  @IsEmpty()
  chapterTitle: string;

  @IsString()
  @IsEmpty()
  lectureTitle: string;
}

export class GotgamDto {
  @IsDate()
  @IsEmpty()
  date: Date;

  @IsNumber()
  @IsEmpty()
  stage: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AchievedLectureDto)
  achievedLectureList: AchievedLectureDto[];
}
