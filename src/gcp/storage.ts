import { Storage } from '@google-cloud/storage';
import { config } from '../shared/config';

const storage = new Storage({
  projectId: config.gcp.projectId,
  credentials: {
    // private_key: config.gcp.privateKey,
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDB3Y6AZ7fKveXh\nxqKAUZSg3LRouM9jozeEf6eSYxPfctGzGlF9sgmytRjVQVsbWvtTmtMWNmDADqkD\nPym+oIxouHbHzBCL+yTvd8T7zLaOGc1HhvGcrpB9/eIdhdFbpwcIPtq1ZVN6D8tA\n891kIAo4XSsvSPBZ7FgLUAu76l7FUVes268t8jCtHG5OklNdj/WHe+K78jpq166J\nEBf16LKe8bTMqKpUS0g5XVVBZkpSEGVgtDXAiGOdEHAowghEOTKdkCYz0CwoAy+K\nZv/6OnBL5bgQg23BswmIIfLO6GaBgQPTvwj3j/3HUyw5BOmajtFEVFB622BSgimx\nb96dazhZAgMBAAECggEABJTUiwbIcl9Z+SOtT+x9n26PyeDCL+fZxkURA/XY8KEh\nQQMIdXi5X3KFp3Z/rW4RPejM/7uhvjAqgNPji+h14Pyo+/A/3Nr+xLT3H/82ujV0\nYzIWcB409nFDQHDa4XhZQ3Hez8YY+qu4YSzSKM1UCIB1Jo0p9uoNq5jE6jgv7KhE\noi/BCnsXTRqlWtUHM7kywxi2XQ5PPq5Lxmw6LxKBhotFW2HEdYpVtWe8uNPJ0QOQ\nFVNomyxLQLmrgwvvkEeOrWUBEf+PlLuVrvre59wP5DEFfiu/l4akxYpSzGaHZ2uz\nyWRMmdhgnENuxUMMTjcE6JguqTgvh8mqXTRwLOf3oQKBgQDx9WJ4XxS+B2g5A4KG\ntrT62yo4eo64l/HR9txR4gbWhbYttJ+LoZZG7wbRmY65OM4wdduj7DUjjFV2SlTB\nwxP8a5IGyW41c5ge4SgXvp3fiCEwlTOS8MrizbwKr3TF+S7JcuJ1Jb8XcUBgHNZF\no5cWa9yXDSQM70osLnxLB6AvMQKBgQDNHa95y9ObhoNpZ+zK6noznBVBqYl5pLD5\ngLjReYxi41a8K2VW2OyV5FGd99fKfRM/ObFdYE4ORGXPZMdXvf6/G8WZB9hs7Kxz\n837P+qf4fIpGE2z8XefQFVXw7dm6kyFj+clHzTD8DJfFbMCAdy7Ap0cLTpVbkvTb\nBxiKJdLhqQKBgDHCi1vCAhwKne6LwD5AOPwWMpqm6c8gwISzxh+44jsgCJVhviYT\nNzqjUb2tXOLOwejJdEBEBbGn3LOVGdU3b1bMMJ3gsx+fBDvlhj9L3l/oORsqtA6W\nIsN+GBwCdXt5gZvAWr5I4wHJMroRdCeiOyJLUHRoKW/XjmODs+AiU1khAoGBAMbE\nAYuxbTnFPAsk3l40on7oveCHfeUXJzhg+LhlZRle3Go0U1u5kmoeesjtp3tdgQ0/\nxxSJgppoxZAYROROBVMEgpMs+xlysBsc1sKMT8GITiZiJLbZ+Q233zQ+CUO32B+d\nquOdf96ABYMXQ+Q5mmCuuTXHzQyUeBrX4Xvd82EhAoGAfVE+7wlvURcGzkz/Fqoy\nQIkA9KNzwP3iLlOVe+un49OHVNPGiLHhCSBP+6woWnm5J1/v6dEEZzhvtltqABnu\ngS9PO36hsOFeJZr3vI7NnyPCBt38MsirFJqCgqyDYK/xwqbbsuh7iBOnoM7em9xE\nefcPiPle5eh00kh+7mWIjrw=\n-----END PRIVATE KEY-----\n',
    client_email: config.gcp.clientEmail,
  },
});

const bucket = storage.bucket(config.gcp.bucketName);

export { storage, bucket };
