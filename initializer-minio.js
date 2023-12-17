import { Client as MinioClient } from "minio";
import afs from "fs/promises";

const rawJson = await afs.readFile("./schema.minio.json", {
    encoding: "utf8",
});

const bucketList = JSON.parse(rawJson);

const client = new MinioClient({
    endPoint: "localhost",
    port: 9000,
    accessKey: "myuser",
    secretKey: "mypassword",
    useSSL: false,
});

const policy = JSON.stringify({
    Id: "Policy1702835233790",
    Version: "2012-10-17",
    Statement: [
        {
            Sid: "Stmt1702835230313",
            Action: ["s3:GetObject"],
            Effect: "Allow",
            Resource: "arn:aws:s3:::images/*",
            Principal: "*",
        },
    ],
});

bucketList.forEach(async (bucketName) => {
    await client.makeBucket(bucketName);
    await client.setBucketPolicy(bucketName, policy);
});
