import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestDB {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://aws-1-ap-south-1.pooler.supabase.com:6543/postgres";
        String user = "postgres.lfxhfvsrkfmqoezutamm";
        String password = "123";

        try {
            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("✅ KẾT NỐI DATABASE TRONG CODE THÀNH CÔNG!");
            conn.close();
        } catch (SQLException e) {
            System.out.println("❌ KẾT NỐI THẤT BẠI: " + e.getMessage());
        }
    }
}
