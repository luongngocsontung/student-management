import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const teachers = await prisma.teacher.createMany({
    data: [
      {
        email: 'teacherken@gmail.com',
      },
      {
        email: 'teacherjoe@gmail.com',
      },
      {
        email: 'teacherDuc@gmail.com',
      },
      {
        email: 'teacherHoang@gmail.com',
      },
    ],
  });

  const students = await prisma.student.createMany({
    data: [
      {
        email: 'studentjon@gmail.com',
      },
      {
        email: 'studenthon@gmail.com',
      },
      {
        email: 'commonstudent1@gmail.com',
      },
      {
        email: 'commonstudent2@gmail.com',
      },
      {
        email: 'student_only_under_teacher_ken@gmail.com',
      },
      {
        email: 'studentmary@gmail.com',
      },
      {
        email: 'studentagnes@gmail.com',
      },
      {
        email: 'studentmiche@gmail.com',
      },
      {
        email: 'studentbob@gmail.com',
      },
    ],
  });

  return { teachers, students };
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
