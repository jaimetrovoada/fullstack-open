/* eslint-disable @typescript-eslint/no-namespace */
export {}
declare global {
    namespace Cypress {
        interface Chainable {
            login({ username, password }: {username:string, password:string}): Chainable<void>;
            createBlog({ title, author, url }: {title:string, author:string, url:string}): Chainable<void>;
        }
    }
}