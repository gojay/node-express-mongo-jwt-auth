import { Router, Request, Response, NextFunction } from "express";

import { add, remove, sign, verify } from "./symmetric.service";

const router = Router();

router.post("/add", (req: Request, res: Response, next: NextFunction) => {
  const kid = req.body.kid;
  add(kid)
    .then((result) => res.json(result))
    .catch(next);
});

router.post("/sign", (req: Request, res: Response, next: NextFunction) => {
  const { id, roles } = req.body;
  sign(id, roles)
    .then((token) => res.json({ token }))
    .catch(next);
});

router.post("/verify", (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token;
  console.log("req.bidy", req.body);
  verify(token)
    .then((result) => res.json(result))
    .catch(next);
});

router.delete("/:kid", (req: Request, res: Response, next: NextFunction) => {
  const kid = req.params.kid;
  remove(kid)
    .then(() => res.status(200).end())
    .catch(next);
});

export default router;
