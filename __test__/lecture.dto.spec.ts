import { Test, TestingModule } from '@nestjs/testing';
import { LectureDto } from '../src/dtos/lecture.dto';

describe('Lecture', () => {
  let provider: LectureDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectureDto],
    }).compile();

    provider = module.get<LectureDto>(LectureDto);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
