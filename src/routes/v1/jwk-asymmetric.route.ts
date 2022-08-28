import { Router, Request, Response, NextFunction } from "express";
import { TokenType } from "types";

import {
  add,
  remove,
  sign,
  verify,
} from "domains/jwk/asymmetric/asymmetric.service";

const router = Router();

router.post("/add", (req: Request, res: Response, next: NextFunction) => {
  add(req.body.kid)
    .then((result) => res.json(result))
    .catch(next);
});

router.post("/sign", (req: Request, res: Response, next: NextFunction) => {
  const { id, role } = req.body;
  sign(TokenType.ACCESS_TOKEN, { sub: id.toString(), role: role })
    .then((token) => res.json({ token }))
    .catch(next);
});

router.post("/verify", (req: Request, res: Response, next: NextFunction) => {
  verify(req.body.token)
    .then((result) => res.json(result))
    .catch(next);
});

router.delete("/", (_, res: Response, next: NextFunction) => {
  remove()
    .then(() => res.status(200).end())
    .catch(next);
});

export default router;