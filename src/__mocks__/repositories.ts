export const mockStudentRepo = {
  getStudentsByEmails: jest.fn(),
  suspendStudentByEmail: jest.fn(),
};

export const mockTeacherRepo = {
  getTeacherByEmail: jest.fn(),
  getCommonStudentsByTeacherEmails: jest.fn(),
  getRegistedStudentsByTeacherId: jest.fn(),
};

export const mockTeacherOnStudentRepo = {
  createTeacherOnStudents: jest.fn(),
};
