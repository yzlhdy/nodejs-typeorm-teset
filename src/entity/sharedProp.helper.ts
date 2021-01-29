import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class SharedProp {
    @CreateDateColumn(
        {
            type: 'datetime',
            name: 'created_at'
        }
    )
    createdAt: Date;

    @UpdateDateColumn({
        type: 'datetime',
        name: 'update_at'
    })
    updateAt: Date;
}