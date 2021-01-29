import { Connection, Repository } from 'typeorm'
import { name, internet, random, date, lorem, locale } from 'faker'
import { PostEntity, UserEntity } from '../entity'
import { writeFileSync } from 'fs'


const createDate = async (con: Connection) => {

    const users: Array<UserEntity> = [];
    for (const _ of Array.from({ length: 20 })) {

        const firstName = name.findName();
        const lastName = name.lastName();
        const isActive = random.arrayElement([true, false]);
        const email = internet.email();
        const password = internet.password();
        const birthData = date.past();
        const user: Partial<UserEntity> = new UserEntity(
            firstName,
            lastName,
            email,
            isActive,
            birthData,
            password,
        );
        users.push((await con.manager.save(user)) as UserEntity)
    }
    await createPost(con, users)
}

const createPost = async (con: Connection, users: Array<UserEntity>) => {
    for (let user of users) {
        const body = lorem.paragraphs();
        const post1 = new PostEntity(body);
        const post2 = new PostEntity(body);
        post1.user = user;
        post2.user = user;
        await con.manager.save(post1)
        await con.manager.save(post2)
    }
    await rendUser(con);
}

const rendUser = async (con: Connection) => {
    const userRepository: Repository<UserEntity> = con.getRepository(UserEntity);
    // const data = await userRepository.find({
    //     order: {
    //         birthData: 'ASC'
    //     },
    //     select: ['firstName', 'id', 'email']
    // })
    // const data = await userRepository.find({
    //     where: {
    //         id: 1
    //     }
    // })

    const data = await userRepository.find({
        relations: ["posts"],

    })
    writeFileSync('data.json', JSON.stringify(data, null, 2))
}

export {
    createDate,

}