import { prisma } from "@/lib/prisma"
import { CreateUserDTO, UpdateUserDTO } from "@/types/user-dto"

export class UserService {
  async create(data: CreateUserDTO) {
    return prisma.user.create({
      data,
    })
  }

  async findAll() {
    return prisma.user.findMany()
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    })
  }

  async update(id: number, data: UpdateUserDTO) {
    return prisma.user.update({
      where: { id },
      data,
    })
  }

  async delete(id: number) {
    return prisma.user.delete({
      where: { id },
    })
  }
}

export const userService = new UserService()
