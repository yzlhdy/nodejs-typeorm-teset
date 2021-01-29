import { PassThrough } from 'stream';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PostEntity } from './posts.entity';
import { SharedProp } from './sharedProp.helper';

@Entity({ name: "users" })
export class UserEntity extends SharedProp {


    constructor(
        firstName: string,
        lastName: string,
        email: string,
        isActive: boolean,
        birthData: Date,
        password: string
    ) {
        super()
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isActive = isActive;
        this.password = password;
        this.birthData = birthData as Date;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "first_name", nullable: false })
    firstName: string;

    @Column({ name: "last_name", nullable: false })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: "is_active", nullable: false })
    isActive: boolean;

    @Column({ name: "birth_data", nullable: false, type: 'date' })
    birthData: Date;

    @Column({ nullable: false })
    password: string;

    @OneToMany(() => PostEntity, (posts: PostEntity) => posts.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    posts: Array<PostEntity>
}