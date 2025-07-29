"use client";

import PageLayout from "@/components/layout/PageLayout";
import ImageHeader from "@/components/sections/ImageHeader";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ParaLeftDesRight from "@/components/sections/ParaLeftDesRight/ParaLeftDesRight";
import "./page.css"

export default function ProjectPage() {
  return (
    <PageLayout>
      <div className="fullWidth">
        <ScrollReveal>
          <ImageHeader />
        </ScrollReveal>
      </div>

      <div className={"wrapper"}>
        <div className={"content"}>
          <ScrollReveal>
            <ParaLeftDesRight
              title="1. Xuất phát từ một tầm nhìn lớn"
              description={``}
              sections={[
                {
                  level: 1,
                  subtitle: "",
                  subdescription: `Trong bối cảnh đô thị hóa ngày càng mạnh mẽ tại Gia Lai, nhu cầu về một khu đô thị hiện đại – văn minh – thông minh trở nên cấp thiết hơn bao giờ hết. Không chỉ là nơi để ở, người dân còn đang mong muốn tìm kiếm một không gian sống hội tụ cả công nghệ, tiện ích, thiên nhiên và cộng đồng.`,
                },
                {
                  level: 1,
                  subtitle: "",
                  subdescription: `Dù cho tình trạng khu đô thị ở Gia Lai hiện nay đang có tiến triển tích cực nhưng vẫn chưa hoàn toàn đáp ứng đủ nhu cầu. Nguyên nhân đến từ việc hệ thống đô thị tại Gia Lai vẫn chưa đồng đều về hạ tầng và chất lượng dịch vụ. Một số đô thị vẫn đang trong quá trình hoàn thiện cơ sở hạ tầng, quy hoạch, chưa đủ để đáp ứng đầy đủ yêu cầu phát triển bền vững và nhu cầu ngày càng cao của người dân.`,
                },
              ]}
              imageUrl="/assets/storyline/big_view.png"
            />
          </ScrollReveal>
          <ScrollReveal>
            <ParaLeftDesRight
              title="2. Một chủ đầu tư dày dặn kinh nghiệm – đầy tâm huyết"
              description={``}
              sections={[
                {
                  level: 1,
                  subtitle: "",
                  subdescription: `Giữa rất nhiều dự án mọc lên mỗi ngày, Plevia City nổi bật không chỉ vì vị trí hay quy hoạch, mà còn bởi người đứng sau nó là một chủ đầu tư vừa vó tầm vừa có tâm – <strong>Công ty Cổ phần Tập đoàn Đầu tư Bắc Hải</strong>. Đây là một chủ đầu tư <strong>đã từng phát triển nhiều dự án bất động sản</strong>, hiểu rõ nhu cầu và mong muốn của người dân và nhà đầu tư, và hơn hết là đặt trọn tâm huyết trong từng dự án.`,
                },
                {
                  level: 1,
                  subtitle: "",
                  subdescription: `Với phương châm "xây dựng không gian sống bền vững và đáng sống",  <strong>Tập đoàn Đầu tư Bắc Hải</strong> không chọn lối đi dễ dàng, mà <strong>kiên trì với những giá trị dài hạn</strong>, đầu tư nghiêm túc từ pháp lý, thiết kế, tiện ích, đến trải nghiệm sống sau khi bàn giao. Plevia City sẽ là minh chứng tiếp theo cho một dự án không chỉ được tính bằng mét vuông, mà còn được đo bằng <strong>tâm – tầm – tín</strong> của người làm thật.`,
                },
              ]}
              imageUrl="/assets/storyline/investor.png"
              reverse={true}
            />
          </ScrollReveal>
          <ScrollReveal>
            <ParaLeftDesRight
              title="3. Khát vọng kiến tạo khu đô thị kiểu mẫu thời đại số"
              description={``}
              sections={[
                {
                  level: 1,
                  subtitle: "",
                  subdescription: `Plevia City không chạy theo số lượng hay hình thức, mà muốn xác lập một tiêu chuẩn sống mới tại Gia Lai - <strong>Khu đô thị đầu tiên ứng dụng trí tuệ nhân tạo</strong>. Cùng với việc  thiết kế kiến trúc đồng bộ, hiện đại, tiện ích đa dạng – tất cả tạo nên mục tiêu lớn nhất: <strong>định hình một chuẩn sống mới – Eco Smart Living đầu tiên</strong> tại Gia Lai`,
                },
                {
                  level: 1,
                  subtitle: "",
                  subdescription: `Đằng sau mỗi tính năng công nghệ là một lựa chọn mang tính tương lai. Không phải để “trưng bày hiện đại”, mà để <strong>kiến tạo một đô thị thực sự biết phục vụ người dùng</strong> – nơi từng căn nhà là một đơn vị thông minh, từng tiện ích là một bước tiến của trải nghiệm sống.`,
                },
              ]}
              imageUrl="/assets/storyline/desire_to_create.png"
            />
          </ScrollReveal>
          <ScrollReveal>
            <ParaLeftDesRight
              title="4. Lan tỏa và kết nối cộng đồng"
              description={``}
              sections={[
                {
                  level: 1,
                  subtitle: "",
                  subdescription: `Câu chuyện của Plevia City không chỉ nằm ở vị trí, công nghệ hay quy hoạch. Đó còn là câu chuyện của một cộng đồng sống văn minh, năng động, kết nối, gắn bó. Mỗi người dân sống tại đây không chỉ đang sở hữu một căn nhà, mà đang góp phần tạo nên một phong cách sống mới cho thành phố.`,
                },
                {
                  level: 1,
                  subtitle: "",
                  subdescription: `Plevia City không hướng đến số đông, mà hướng đến những cư dân có cùng cách nghĩ lối sống thông minh, hiện đại. Chính sự đồng điệu ấy đã và sẽ kiến tạo nên một cộng đồng thân thiện, cởi mở và đầy cảm hứng – nơi người ta không chỉ sống gần nhau, mà còn thật sự hiểu nhau.`,
                },
              ]}
              imageUrl="/assets/storyline/community.png"
              reverse={true}
            />
          </ScrollReveal>
          <ScrollReveal>
            <ParaLeftDesRight
              title="5. Một giấc mơ có thật – Một cơ hội có thật"
              description={``}
              sections={[
                {
                  level: 1,
                  subtitle: "",
                  subdescription: `Với việc Gia Lai chuyển mình mạnh mẽ với hạ tầng đô thị ngày càng phát triển, kéo theo đó là tiêu chuẩn sống của người dân ngày một cao. Plevia City ra đời như một lời đáp cho nhu cầu sống hiện đại – thông minh – đẳng cấp. Không chỉ đơn thuần là một khu đô thị, Plevia City mang trong mình khát vọng kiến tạo chuẩn sống kiểu mẫu cho thời đại số, nơi công nghệ và không gian sống hài hòa trong từng trải nghiệm.`,
                },
                {
                  level: 1,
                  subtitle: "",
                  subdescription: `Khi mọi thứ còn đang trong giai đoạn tăng tốc, những sản phẩm như Plevia City – với quy hoạch bài bản, pháp lý rõ ràng và định vị khác biệt – chính là những “cánh cửa sớm” cho những ai biết nhìn xa. Giấc mơ an cư không còn xa vời, và cơ hội đầu tư cũng không chỉ nằm trên giấy. Plevia City là nơi để sống, nhưng cũng là nơi để đầu tư. Sở hữu vị trí chiến lược nằm giữa trung tâm, lại được bảo chứng bởi chủ đầu tư có tâm – có tầm, dự án mở ra cơ hội tăng trưởng bền vững, đáng giá theo thời gian.`,
                },
              ]}
              imageUrl="/assets/storyline/dream.png"
            />
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
