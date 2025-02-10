export const documentMock = (()=>({
    querySelector: (selector) => ({
        innerHtml:null,
    }),
}))();