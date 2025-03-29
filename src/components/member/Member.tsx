import { useEffect, useMemo } from "react";
import MemberCard from "./MemberCard";
import { fetchMembers } from "../../store/reducers/member";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { IUser } from "../../definitions/user";

const shuffleArray = (array: IUser[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Member: React.FC = () => {
  const { members } = useAppSelector((state) => state.member);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const shuffledMembers = useMemo(() => shuffleArray(members), [members]);

  return (
    <section className="p-6 w-full">
      <h2 className="text-2xl mb-5">| Meet us</h2>
      <div className="w-full flex flex-row items-center justify-center">
        <MemberCard members={shuffledMembers} />
      </div>
    </section>
  );
};

export default Member;
