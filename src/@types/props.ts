type BaseProps = {
    id?: string | number;
    className?: string;
}

export type cardDto = {
    name: string;
    description: string;
}

export type CustomCardProps = BaseProps & Partial<cardDto> & {
    deleteHandler?: (data?: any) => void;
    edit?: (data?: any) => void;
    type?: 'add' | 'update'
};