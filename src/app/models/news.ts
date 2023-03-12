export class News {

    constructor(
        public link: string,
        public category: string,
        public image: string,
        public title: string,
        public text: string,
        public createdAt: Date
    ) {}
};