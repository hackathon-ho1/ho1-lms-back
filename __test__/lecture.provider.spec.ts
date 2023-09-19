import { Test, TestingModule } from '@nestjs/testing';
import { LectureProvider } from '../src/providers/lecture.provider';

describe('Lecture', () => {
  let provider: LectureProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectureProvider],
    }).compile();

    provider = module.get<LectureProvider>(LectureProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
